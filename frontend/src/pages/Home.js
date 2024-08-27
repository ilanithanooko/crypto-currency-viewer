import HeroPicture from "../assets/HeroPicture.jpg";

const Home = () => {
  return (
    <div class="row gx-4 gx-lg-5 align-items-center my-3">
      <div class="col-lg-7">
        <img class="img-fluid rounded-4 mb-2 mb-lg-0 " src={HeroPicture} />
      </div>
      <div class="col-lg-5">
        <h1 class="font-weight-light">Crypto Currency Viewer</h1>
        <p class="fs-5 mb-3">
          Discover the power of our <b>Crypto Currency Viewer</b>, your gateway
          to the latest market trends and real-time data on all your favorite
          coins. Whether you're tracking prices, analyzing trends, or exploring
          new opportunities, our platform gives you the tools to stay informed
          and make smart decisions in the dynamic world of cryptocurrencies.
          Ready to dive in?
        </p>
        <a class="btn btn-primary fs-5 py-2" href="/signup">
          Let's get started!
        </a>
      </div>
    </div>
  );
};

export default Home;
