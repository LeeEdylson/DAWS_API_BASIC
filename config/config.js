//se encargara de exportar las variables

export const base_url = "/api/v1";
export const port = process.env.PORT || 8090;
export const secret = process.env.SECRET || "secret";
const mongo_remoto = "mongodb+srv://root:EkjLm6ii3QpiMh9D@cluster0.ixbxj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
export const db_url = process.env.DB_URL || mongo_remoto ;