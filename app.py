from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/introduction")
def introduction():
    return render_template("introduction.html")

@app.route("/processors")
def processors():
    return render_template("processors.html")

@app.route("/error-correction")
def error_correction():
    return render_template("error_correction.html")

@app.route("/qml-ai")
def qml_ai():
    return render_template("qml_ai.html")

@app.route("/post-quantum-crypto")
def post_quantum_crypto():
    return render_template("post_quantum_crypto.html")

@app.route("/quantum-languages")
def quantum_languages():
    return render_template("quantum_languages.html")

@app.route("/algorithms")
def algorithms():
    return render_template("algorithms.html")

@app.route("/applications")
def applications():
    return render_template("applications.html")

@app.route("/tools")
def tools():
    return render_template("tools.html")

@app.route("/blog")
def blog():
    return render_template("blog.html")

@app.route("/features")
def features():
    return render_template("features.html")

if __name__ == "__main__":
    app.run(debug=True, port=5000)

