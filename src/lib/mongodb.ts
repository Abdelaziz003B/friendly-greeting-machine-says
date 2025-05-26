import { MongoClient, ServerApiVersion } from 'mongodb';

// Replace this with your MongoDB connection string
// Example: "mongodb+srv://username:password@cluster.mongodb.net/dbname"
const uri = "mongodb+srv://your-username:your-password@your-cluster.mongodb.net/marketplace-db?retryWrites=true&w=majority";  // Add your MongoDB URI here
let client: MongoClient | null = null;
let isConnected = false;

export const connectToMongoDB = async () => {
  if (isConnected) {
    console.log('Already connected to MongoDB');
    return client;
  }

  try {
    if (!uri || uri.includes('your-username')) {
      console.error('MongoDB URI is required. Please add your MongoDB connection string.');
      return null;
    }

    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!");
    isConnected = true;
    return client;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    return null;
  }
};

export const createUser = async (email: string, password: string, name: string) => {
  try {
    const mongoClient = await connectToMongoDB();
    if (!mongoClient) {
      return { error: "MongoDB connection failed", data: null };
    }

    const db = mongoClient.db("users");
    const usersCollection = db.collection("users");

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return { error: "User with this email already exists", data: null };
    }

    // In a real application, you would hash the password before storing
    // This is just a simplified example
    const newUser = {
      email,
      password, // NEVER store plaintext passwords in production
      name,
      createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);
    return { data: { id: result.insertedId, email, name }, error: null };
  } catch (error) {
    console.error('Error creating user in MongoDB:', error);
    return { error: "Failed to create user", data: null };
  }
};

export const validateUser = async (email: string, password: string) => {
  try {
    const mongoClient = await connectToMongoDB();
    if (!mongoClient) {
      return { error: "MongoDB connection failed", data: null };
    }

    const db = mongoClient.db("users");
    const usersCollection = db.collection("users");

    // Find user by email and password
    // In a real application, you would compare hashed passwords
    const user = await usersCollection.findOne({ email, password });
    if (!user) {
      return { error: "Invalid credentials", data: null };
    }

    return { 
      data: { 
        id: user._id.toString(), 
        email: user.email, 
        name: user.name 
      }, 
      error: null 
    };
  } catch (error) {
    console.error('Error validating user in MongoDB:', error);
    return { error: "Authentication failed", data: null };
  }
};
