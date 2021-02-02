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
    ls_year = [int(year) for year in request.args.getlist("n")]
    # ls_col = request.args.getlist("m")

    # Generate a list of all the months we need to get
    all_years = [str(year) for year in range(min(ls_year), max(ls_year) + 1)]

    # Grab all of the wanted months by filtering for the ones we want
    wanted_ages = reduce(
        lambda a, b: a | b, (app.df["Age"].astype(str).str.contains(year) for year in all_years)
    )
    print(wanted_ages)
    # Create a new dataframe from the one that
    df_new = app.df[wanted_ages][["Age"] + ["Survived", "Sex"]]

    # sort the values by age
    # df_new = df_new.sort_values(by=["Age"])

    return  df_new.to_json(), 200

    # Convert all string dates into datetime objects and then sort them
    # df_new["month"] = pd.to_datetime(df_new["month"])

    # return all_years


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=3000)