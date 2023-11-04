from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample menu data (in-memory, replace with a database in a real application)
menu = {
    "1": {"name": "Burger", "price": 10.99},
    "2": {"name": "Pizza", "price": 12.99},
    "3": {"name": "Pasta", "price": 8.99},
}

# Sample order storage (in-memory, replace with a database)
orders = {}


@app.route('/webhook', methods=['POST'])
def webhook():
    data = request.get_json()

    # Handle incoming messages
    if data['message']:
        message_text = data['message']['text']
        chat_id = data['message']['chat']['id']

        response_text = process_message(message_text, chat_id)
        send_message(chat_id, response_text)

    return jsonify({'status': 'ok'})


def process_message(message, chat_id):
    if message.lower() == '/start':
        return "Welcome to Restaurant Bot! You can use /menu to see the menu."
    elif message.lower() == '/menu':
        return show_menu()
    elif message.startswith('/order'):
        return place_order(message, chat_id)
    else:
        return "I don't understand. Please use /menu to see the menu."

def show_menu():
    menu_text = "Menu:\n"
    for item_id, item_info in menu.items():
        menu_text += f"{item_id}. {item_info['name']} - ${item_info['price']}\n"
    return menu_text

def place_order(message, chat_id):
    item_id = message.split(' ')[-1]
    if item_id in menu:
        item_name = menu[item_id]['name']
        orders[chat_id] = item_name
        return f"You've ordered {item_name}. Enjoy your meal!"
    else:
        return "Invalid item ID. Please use /menu to see the menu."

def send_message(chat_id, text):
    # In a real application, you would use a library like python-telegram-bot to send messages.
    # Here, we'll just print the response to the console.
    print(f"Response to {chat_id}: {text}")


if __name__ == '__main__':
    app.run()
