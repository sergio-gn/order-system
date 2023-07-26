import GetData from "../components/getData";

function Home({addToCart}){
    return(
        <div>
            <GetData addToCart={addToCart}/>
        </div>
    )
}
export default Home;