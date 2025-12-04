#!/bin/bash

echo "Starting the Auto Shop!"

echo "Starting Frontend!"
cd ./frontend
npm run dev

echo "Starting Backend!"
cd ../backend
.venv/Scripts/activate
pip install -r requirements.txt
python app.py