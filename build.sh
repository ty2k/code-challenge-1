# Create a directory for our production-optimized React app to be served from
# if it doesn't already exist
if [ ! -d "./backend/frontend-build" ]; then
  mkdir ./backend/frontend-build
fi

cd frontend

# Run the build script from Create React App
npm run build

# Copy the contents of frontend/build to backend/frontend-build
cp -R ./build/* ../backend/frontend-build/

# Clean up the frontend/build directory
rm -R ./build
