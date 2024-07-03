import re


class Utility:

    def extract_value_regex(self, pattern, text, index_group):
        match = re.search(pattern, text)
        if match:
            result = match.group(index_group)
            return result
        else:
            print("Error to extract value using regex")