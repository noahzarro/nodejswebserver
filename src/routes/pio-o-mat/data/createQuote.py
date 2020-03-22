import json

go_on = 'y'

with open("quotes.json", 'r') as quotes_file:
    quotes = json.load(quotes_file)

while go_on != 'n':
    new_quote = {}
    new_quote["quote"] = input("Quote: ")
    new_quote["name"] = input("Name: ")
    new_quote["time"] = input("Time: ")
    new_quote["id"] = len(quotes["quotes"])
    quotes["quotes"].append(new_quote)

    go_on = input("go on n/[y]")
with open("quotes.json", 'w') as quotes_file:
    json.dump(quotes, quotes_file)
