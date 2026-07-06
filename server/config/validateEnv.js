const requiredEnvVars = [
  "MONGO_URI",
  "ACCESS_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET",
  "SESSION_SECRET",
  "SERVER_URL",
  "CLIENT_URL",
];

function validateEnv() {
  const missing = [];
  const weak = [];

  requiredEnvVars.forEach((varName) => {
    const value = process.env[varName];
    if (!value) {
      missing.push(varName);
      return;
    }

    if (varName.includes("SECRET") && value.length < 32) {
      weak.push(`${varName} (must be at least 32 characters)`);
    }
  });

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }

  if (weak.length > 0) {
    throw new Error(`Weak environment secrets detected: ${weak.join(", ")}`);
  }
}

module.exports = validateEnv;
