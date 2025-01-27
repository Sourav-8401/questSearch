import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import mongoose from "mongoose";
import { Question } from "./models/question.model.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from 'dotenv'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({
    path: './.env'
})
const connectDB = async ()=>{
   try {
      const connectionInstance = await mongoose.connect(process.env.MONGO_URI)
      console.log("MONGODB CONNECTION SUCCESSFUL: DB_HOST ",connectionInstance.connection.host);
   } catch (error) {
      console.log("MONGODB CONNECTION ERROR :", error);
   }
}
connectDB();
// Load protobuf
const PROTO_PATH = path.resolve(__dirname, "../../proto/search.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const searchProto = grpc.loadPackageDefinition(packageDefinition).search;

// the service methods
const showSuggestion = async (call, callback) => {
  const { search } = call.request;

  if (!search || search.trim() === "") {
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: "Search query is required",
    });
  }

  try {
    const queryRes = await Question.find(
      { title: { $regex: search, $options: "i" } },
      { title: 1 }
    ).limit(7);

    if (queryRes.length === 0) {
      return callback(null, {
        error: {
          message: "No data found",
        },
      });
    }

    const titles = queryRes.map((item) => ({
      id: item._id.toString(),
      title: item.title,
    }));

    callback(null, {
      data: {
        titles: titles,
      },
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: "Failed to retrieve data",
      details: error.message,
    });
  }
};

const searchTitles = async (call, callback) => {
  const { search, limits } = call.request;

  if (!search || search.trim() === "") {
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: "Search query is required",
    });
  }

  try {
    const queryRes = await Question.find({
      title: { $regex: search, $options: "i" },
    }).limit(Number(limits) || 10);

    if (queryRes.length === 0) {
      return callback(null, {
        error: {
          message: "No data found",
        },
      });
    }

    const questions = queryRes.map((item) => ({
      id: item._id.toString(),
      type: item.type,
      anagram_type: item.anagramType,
      blocks: item.blocks?.map((block) => ({
        text: block.text,
        show_in_option: block.showInOption,
        is_answer: block.isAnswer,
      })),
      options: item.options?.map((option) => ({
        text: option.text,
        is_correct_answer: option.isCorrectAnswer,
      })),
      sibling_id: item.siblingId?.toString(),
      solution: item.solution,
      title: item.title,
    }));

    callback(null, {
      data: {
        questions: questions,
      },
    });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: "Failed to retrieve data",
      details: error.message,
    });
  }
};

// start gRPC server
function startServer() {
  const server = new grpc.Server();
  server.addService(searchProto.SearchService.service, {
    showSuggestion,
    searchTitles,
  });

  server.bindAsync(
    `0.0.0.0:${process.env.PORT || 8082}`,
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error("Failed to start server:", error);
        return;
      }
      console.log(`Server running at http://0.0.0.0:${port}`);
    }
  );
}

startServer();
