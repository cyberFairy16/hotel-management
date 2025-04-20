import mysql.connector
import kagglehub
from kagglehub import KaggleDatasetAdapter
import pandas as pd
import random

path = kagglehub.dataset_download("raj713335/tbo-hotels-dataset")

print("Path to dataset files:", path)




# Example usage:
file_path = r'C:\Users\chris\hotels.csv'
df= pd.read_csv(file_path, usecols=[' HotelName', ' Address', ' HotelRating', ' countyName', 'countyCode'], encoding='latin1')
print("First 5 records:", df.head())

rating_map = {
    'OneStar': 1,
    'TwoStar': 2,
    'ThreeStar': 3,
    'FourStar': 4,
    'FiveStar': 5,
    'All': 5
}

# Apply the mapping to the 'rating' column
df[' HotelRating'] = df[' HotelRating'].map(rating_map)
df[' HotelRating'] = df[' HotelRating'].fillna(0).astype(int)
df[' HotelName'] = df[' HotelName'].fillna("N/A").astype(str)
df[' Address'] = df[' Address'].fillna("No known Address").astype(str)

df.columns = ['country_code','country','name', 'rating', 'address']
print("First 5 records after renaming columns:", df.head())
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Fastrunner#11",
    database="hotels_database"
)

cursor = mydb.cursor()

for index, row in df.iterrows():
    row = row.where(pd.notnull(row), None)
    sql = """
      INSERT INTO hotels (country_code, country, name, rating, address) 
      VALUES (%s,%s,%s, %s, %s)
    """
    cursor.execute(sql, tuple(row))
mydb.commit()
cursor.close()
mydb.close()
print("Data inserted successfully!") 
cursor = mydb.cursor()

# Get hotel IDs in Georgia
cursor.execute("SELECT id FROM hotels WHERE country = 'United States' AND address LIKE '%Georgia%'")
georgia_hotel_ids = [row[0] for row in cursor.fetchall()]
print(f"Found {len(georgia_hotel_ids)} Georgia hotels")

bed_sizes = ['T', 'Q', 'K']
insert_data = []
insert_count = 0

for hotel_id in georgia_hotel_ids:
    print(f"Inserting rooms for hotel_id: {hotel_id}")
    for room_number in range(10, 60):
        floor = room_number // 10
        bed_size = random.choice(bed_sizes)
        insert_data.append((hotel_id, floor, room_number, 0, bed_size))

        # Batch insert every 1000 rows
        if len(insert_data) >= 1000:
            cursor.executemany("""
                INSERT INTO Rooms (hotel_id, floor, room_number, isBooked, bedSize, room_type_id, room_price_id)
                VALUES (%s, %s, %s, %s, %s, NULL, NULL)
            """, insert_data)
            mydb.commit()
            insert_count += len(insert_data)
            print(f"Inserted {insert_count} rooms so far...")
            insert_data.clear()

# Final commit for any remaining
if insert_data:
    cursor.executemany("""
        INSERT INTO Rooms (hotel_id, floor, room_number, isBooked, bedSize, room_type_id, room_price_id)
        VALUES (%s, %s, %s, %s, %s, NULL, NULL)
    """, insert_data)
    mydb.commit()
    insert_count += len(insert_data)
    print(f"Inserted final {len(insert_data)} rooms.")

print(f"Total inserted: {insert_count}")
mydb.close()

cursor = mydb.cursor()

# Mapping floors to room type and price ranges
room_type_map = {
    (1, 2): {"room_type_id": 1, "min_price": 80, "max_price": 150},
    (3, 4): {"room_type_id": 2, "min_price": 250, "max_price": 350},
    (5, 5): {"room_type_id": 3, "min_price": 650, "max_price": 850}
}

# Fetch all rooms
cursor = mydb.cursor()

# Floor-to-room-type + price range
room_type_map = {
    (1, 2): {"room_type_id": 1, "min_price": 80, "max_price": 150},
    (3, 4): {"room_type_id": 2, "min_price": 250, "max_price": 350},
    (5, 5): {"room_type_id": 3, "min_price": 650, "max_price": 850}
}

# Define 3-month date ranges (2025 example)
date_ranges = [
    ("2025-01-01", "2025-03-31"),
    ("2025-04-01", "2025-06-30"),
    ("2025-07-01", "2025-09-30"),
    ("2025-10-01", "2025-12-31")
]

# Fetch rooms
cursor.execute("SELECT id, floor FROM rooms")
rooms = cursor.fetchall()

room_price_inserts = []
room_type_updates = []

for room_id, floor in rooms:
    room_type_id = None
    min_price = max_price = None

    # Determine type/price by floor
    for floors, config in room_type_map.items():
        if floor in range(floors[0], floors[1] + 1):
            room_type_id = config['room_type_id']
            min_price = config['min_price']
            max_price = config['max_price']
            break

    if room_type_id is None:
        continue  # Skip floors outside 1–5

    # Create 4 room_price entries (1 per 3-month period)
    for start_str, end_str in date_ranges:
        price = round(random.uniform(min_price, max_price), 2)

        room_price_inserts.append((
            start_str,
            end_str,
            room_id,
            price
        ))

    # Add to room_type update list
    room_type_updates.append((room_type_id, room_id))

# Insert into room_price
# Batch insert function
def batch_execute(query, data, batch_size=1000, label=""):
    for i in range(0, len(data), batch_size):
        batch = data[i:i + batch_size]
        cursor.executemany(query, batch)
        print(f"{label} - Batch {i // batch_size + 1}: {len(batch)} records")

# Batch insert into room_price
batch_execute("""
    INSERT INTO room_price (date_from, date_to, room_id, price)
    VALUES (%s, %s, %s, %s)
""", room_price_inserts, label="Room Price Insert")

# Batch update room_type_id
batch_execute("""
    UPDATE rooms
    SET room_type_id = %s
    WHERE id = %s
""", room_type_updates, label="Room Type Update")

# Finalize transaction
mydb.commit()
print(f"✅ Inserted {len(room_price_inserts)} room_price entries.")
print(f"✅ Updated {len(room_type_updates)} room_type_id values.")

mydb.close()