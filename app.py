"""
    Visualizing titanic dataset number of survivals
"""
from functools import reduce

import pandas as pd
from flask import Flask, render_template, request

app = Flask(__name__)

# Attach our dataframe to our app
app.df = pd.read_csv("titanic.csv", skiprows=1)
app.df.columns = ["PassengerId", "Survived", "Pclass", "Name",
                 "Sex", "Age", "SibSp", "Parch", "Ticket", "Fare",
                 "Cabin", "Embarked"]

@app.route("/", methods=["GET"])
def get_root():
    """
        Root route that returns the index page
    """
    return render_template("index.html"), 200


@app.route("/titanic", methods=["GET"])
def get_time_series_data():
    """
        Return the necessary data to create a the titanic viz
    """
    # Grab the requested years and columns from the query arguments
    ls_age = [int(age) for age in request.args.getlist("n")]

    # Generate a list of all the ages we need to get
    all_ages = [str(age) for age in range(min(ls_age), max(ls_age) + 1)]

    # Grab all of the wanted months by filtering for the ones we want
    wanted_ages = reduce(
        lambda a, b: a | b, (app.df["Age"].astype(str).str.contains(age) for age in all_ages)
    )
    print(wanted_ages)

    # Create a new dataframe that has only the age interval provided
    df_new = app.df[wanted_ages][["Age"] + ["Survived", "Sex"]]

    return  df_new.to_json(), 200

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=3000)