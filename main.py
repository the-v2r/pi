from flask import Flask, render_template_string, request, jsonify
import os, subprocess

app = Flask(__name__)

f = open("index.html", "r")
HTML = "".join(f)

@app.route("/")
def index():
    return render_template_string(HTML)

@app.route("/execute", methods=['POST'])
def execute_code():
    data = request.json
    if not data or 'code' not in data:
        return jsonify({'error': 'invalid code'})
    
    code = data['code']
    file_path = os.path.join(os.getcwd(), 'temp_code.py')

    try:
        with open(file_path, 'w') as f:
            f.write(code)

        result = subprocess.run(['python', file_path], capture_output=True, text=True)
        os.remove(file_path)

        if result.returncode == 0:
            return jsonify({'output': result.stdout}), 200
        else:
            return jsonify({"error": result.stderr}), 400
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

app.run(port=1010, debug=True)