import os

import pymongo
from bson import ObjectId
from dotenv import load_dotenv


class MongoUtils:

    def __init__(self):
        load_dotenv()
        self.client = pymongo.MongoClient(os.getenv("MONGODB_URL"))
        self.database = self.client["wastewater"]
        self.collection = self.database["bill"]

    def update(self, query, update_values):
        self.collection.update_one(query, update_values)

    def find_el(self, id_element):
        return self.collection.find_one({"_id": ObjectId(id_element)})
