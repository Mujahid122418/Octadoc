let Baseurl = "";

if (process.env.NODE_ENV === "production") {
  // Production environment
  Baseurl = "http://54.87.94.123:5051"; // Replace with your production API URL
} else {
  // Development environment
  Baseurl = "http://localhost:5051"; // Replace with your development API URL
}

export { Baseurl };
