import mongoose, {Schema} from "mongoose";

const helloItemSchema = new Schema(
    {
        enWelcome: String,
        enDescription: String,
        uaWelcome: String,
        uaDescription: String,
        plWelcome: String,
        plDescription: String,
        imageURL: String,
    },
    {
        timestamps: true,
    }
);
const aboutMeItemSchema = new Schema(
    {
        enTitle: String,
        enDescription: String,
        uaTitle: String,
        uaDescription: String,
        plTitle: String,
        plDescription: String,
        imageURL: String,
    },
    {
        timestamps: true,
    }
);

const myPortfolioItemSchema = new Schema(
    {

        enDescription: String,
        uaDescription: String,
        plDescription: String,
        imageURL: String
    },
    {
        timestamps: true,
    }
);
const myNewsItemSchema = new Schema(
    {
        enTitle: String,
        enDescription: String,
        uaTitle: String,
        uaDescription: String,
        plTitle: String,
        plDescription: String,
        imageURL: String
    },
    {
        timestamps: true,
    }
);
// const FAQSItemSchema = new Schema(
//     {
//         enQuestion: String,
//         enAnswer: String,
//         uaQuestion: String,
//         uaAnswer: String
//     },
//     {
//         timestamps: true,
//     }
// );


const HelloItem = mongoose.models.HelloItem || mongoose.model('HelloItem', helloItemSchema);
const AboutMeItem = mongoose.models.AboutMeItem || mongoose.model('AboutMeItem', aboutMeItemSchema);
const MyPortfolioItem = mongoose.models.MyPortfolioItem || mongoose.model('MyPortfolioItem', myPortfolioItemSchema);
const MyNewsItem = mongoose.models.MyNewsItem || mongoose.model('MyNewsItem', myNewsItemSchema);
// const FAQSItem = mongoose.models.FAQSItem || mongoose.model('FAQSItem', FAQSItemSchema);



export { HelloItem, AboutMeItem, MyPortfolioItem, MyNewsItem };
//here I have to define some more schemas of content and then use them in my code