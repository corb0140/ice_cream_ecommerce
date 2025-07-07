function AboutPage() {
  return (
    <div className="min-h-screen bg-livid-brown text-white px-6 py-20">
      <div className="max-w-5xl mx-auto text-center space-y-10">
        <h1 className="text-4xl font-bold">About Sweet Tooth</h1>
        <p className="text-lg leading-relaxed">
          At Sweet Tooth, ice cream isn't just a treat — it's a passion. We're
          devoted to crafting rich, creamy, and unforgettable ice cream flavors
          that bring people together and spark joy. From classic favorites to
          bold seasonal specials, we scoop happiness into every cone and cup.
        </p>

        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
            <p>
              Our goal is simple: serve the best ice cream in town while
              delivering smiles. We blend locally sourced ingredients with
              creative flair to create unique flavors that are as delicious as
              they are memorable. Every scoop is made with love, care, and a
              commitment to quality.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              Why Choose Sweet Tooth?
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Locally churned, ultra-creamy textures</li>
              <li>Rotating seasonal and limited-edition flavors</li>
              <li>Vegan, dairy-free & allergen-friendly options</li>
              <li>Family-friendly shop and fast delivery service</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mt-10 mb-3">Thank You</h2>
          <p>
            Whether you're celebrating a birthday, cooling off on a summer day,
            or just treating yourself — we're honored to be your go-to ice cream
            spot. Thank you for making Sweet Tooth a part of your sweetest
            memories!
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
