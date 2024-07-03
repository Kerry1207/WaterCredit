import pymongo
from bson import ObjectId


class MongoUtils:

    def __init__(self):
        self.client = pymongo.MongoClient("mongodb+srv://wastewater:aIXKFguliXkkx8ru@wastewater.w1y2ocu.mongodb.net/")
        self.database = self.client["wastewater"]
        self.collection = self.database["bill"]

    def update(self, query, update_values):
        self.collection.update_one(query, update_values)

    def find_el(self, id_element):
        return self.collection.find_one({"_id": ObjectId(id_element)})
