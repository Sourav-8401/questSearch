export default async function uploadData() {
    try{
        const jsonData = JSON.parse(fs.readFileSync('./src/questions.json', 'utf8'));
        console.log(jsonData[0]);

        const processedData = jsonData.map(item => ({
            ...item,
            _id: item._id?.$oid ? new mongoose.Types.ObjectId(item._id.$oid) : undefined, 
            siblingId: item.siblingId?.$oid ? new mongoose.Types.ObjectId(item.siblingId.$oid): null, 
        }));
        await Question.insertMany(processedData);
        console.log('Data uploaded Successfully',jsonData[0]._id.$oid);
        mongoose.connection.close();
    }
    catch(err){
        console.log("EROR: ", err);
    }
}
