import requests
import json
import datetime
import sqlite3

url = "https://covid-api.mmediagroup.fr/v1/cases?country=Germany"
content = requests.get(url).content
dataset = json.loads(content)



dataframe = list()

data = (dataset['All']['country'])
dataframe.append(data)
data = (dataset['All']['confirmed'])
dataframe.append(data)
data = (dataset['All']['recovered'])
dataframe.append(data)
data = (dataset['All']['deaths'])
dataframe.append(data)

print(dataframe)

try:
    db = sqlite3.connect('coviddata')
    cursor = db.cursor()
    cursor.execute("""CREATE TABLE IF NOT EXISTS covidinfo (country text PRIMARY KEY, confirmed long, recovered long, deaths long); """)

except Exception as E:
    print('Error : ', E)
else:
    print('Table created')

try:
    cursor.execute("""INSERT INTO covidinfo VALUES (?, ?, ?, ?)""", dataframe)
except Exception as E:
    print('Error : ', E)
else:
    print('Data inserted')

db.commit()
print("database closed")