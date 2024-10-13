from flask import Flask, render_template
import json

app = Flask(__name__)

@app.route('/')
def index():
    # Load project data from a JSON file (you can replace this with a database in the future)
    with open('static/data/projects.json', 'r') as f:
        projects = json.load(f)
    return render_template('index.html', projects=projects)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
