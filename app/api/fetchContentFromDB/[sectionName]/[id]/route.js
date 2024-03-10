
// import connectMongoDB from '@/libs/mongo_db';
// import { HelloItem, AboutMeItem, MyPortfolioItem, MyBlogItem, FAQSItem } from '@/models/models';


// export async function GET(request, {params}){

//     const {id, sectionName} = params;
//     await connectMongoDB();
//     const specificContentItem = await ContentItem.findOne({_id: id});
//     return NextResponse.json({specificContentItem}, {status: 200})
// } 
import { NextResponse } from "next/server";
import connectMongoDB from '@/libs/mongo_db';
import mongoose from "mongoose";
import { HelloItem, AboutMeItem, MyPortfolioItem, MyNewsItem } from '@/models/models';
import { sectionToModelMap, getModelProperties} from "../route";

export async function GET(req, { params }) {
  try {
    const { sectionName, id } = params;
    const modelProperties = getModelProperties(sectionName);
    console.log("sectionName:", sectionName);
    console.log("id:", id);

    console.log('Starting GET method');
    await connectMongoDB();
    console.log('Connected to MongoDB');

    const model = sectionToModelMap[sectionName];

    if (!model) {
      return NextResponse.error({ message: 'Invalid sectionName' }, { status: 400 });
    }

    const contentItem = await model.findOne({_id: id});

    if (!contentItem) {
      return NextResponse.error({ message: 'Item not found' }, { status: 404 });
    }

    console.log('Content item:', contentItem);

    return NextResponse.json({ contentItem, modelProperties}, { status: 200 });
  } catch (error) {
    console.error('Error in GET method:', error);
    return NextResponse.error({ message: 'Internal Server Error' }, { status: 500 });
  }
}


export async function PUT(request, { params }) {
    try {
      const propertiesToExclude = ["_id", "createdAt", "updatedAt", "__v"];
      const { sectionName, id } = params;
      const body  = await request.json();
      // console.log("request.json()", await request.json())
      console.log("sectionName:", sectionName);
      console.log("id:", id);
      console.log("Received data:", body);
  
      console.log('Starting PUT method');
      await connectMongoDB();
      console.log('Connected to MongoDB');
  
      const model = sectionToModelMap[sectionName];
  
      if (!model) {
        return NextResponse.error({ message: 'Invalid sectionName' }, { status: 400 });
      }
  
      // Get the valid properties from the model schema
      //const validProperties = Object.keys(model.schema.paths);
      const modelProperties = getModelProperties(sectionName);
      // Extract only the valid properties from the request body
      const filteredData = {};
      Object.keys(body).forEach((key) => {
      if (modelProperties.includes(key) && !(propertiesToExclude.includes(key))) {
        filteredData[key] = body[key];
      }
    });
  
      // Update the document with the filtered data
      const updatedContentItem = await model.findByIdAndUpdate(id, filteredData, { new: true });
  
      return NextResponse.json({ message: "Item updated", updatedContentItem }, { status: 200 });
    } catch (error) {
      console.error('Error in PUT method:', error);
      return NextResponse.error({ message: 'Internal Server Error' }, { status: 500 });
    }
  }