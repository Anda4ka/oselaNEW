#!/bin/sh
echo "Running database migrations..."
npx prisma migrate deploy
echo "Running database seed..."
node prisma/seed.mjs
echo "Starting server..."
node server.js
