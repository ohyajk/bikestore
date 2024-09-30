import { FC } from "react"

const About: FC = () => {
    return (
        <div className=" mx-4">
            <h1 className=" text-3xl font-bold mb-4 text-center">
                About BikeStore
            </h1>
            <p className="mb-6 text-lg">
                Welcome to BikeStore, your premier destination for high-quality
                bicycles! Whether you're an avid mountain biker, a road cycling
                enthusiast, or someone looking to explore the benefits of
                electric bikes, we have something for everyone.
            </p>

            <h2 className="text-2xl font-semibold mb-3">Our Story</h2>
            <p className="mb-6 text-lg">
                At BikeStore, we believe in the power of cycling to transform
                lives. Our journey began with a simple idea: to provide
                top-notch bicycles that cater to the needs of every rider, from
                beginners to professionals. With a passion for cycling and a
                commitment to excellence, we've grown into a trusted name in the
                cycling community.
            </p>

            <h2 className="text-2xl font-semibold mb-3">What We Offer</h2>
            <ul className="list-disc list-inside mb-6 text-lg">
                <li className="mb-2">
                    <strong>Mountain Bikes (MTB):</strong> Conquer the trails
                    with our range of durable and high-performance mountain
                    bikes. Designed for rugged terrains, our MTBs offer the
                    perfect blend of strength and agility.
                </li>
                <li className="mb-2">
                    <strong>Road Bikes:</strong> Experience the thrill of speed
                    and precision with our selection of road bikes. Built for
                    performance and endurance, these bikes are perfect for long
                    rides and competitive racing.
                </li>
                <li className="mb-2">
                    <strong>Electric Bikes:</strong> Embrace the future of
                    cycling with our cutting-edge electric bikes. Whether you
                    need a boost for your daily commute or want to enjoy longer
                    rides with less effort, our e-bikes provide the perfect
                    solution.
                </li>
            </ul>

            <h2 className="text-2xl font-semibold mb-3">Our Commitment</h2>
            <p className="mb-6 text-lg">
                At BikeStore, customer satisfaction is our top priority. We are
                dedicated to providing exceptional service, expert advice, and a
                wide range of products to meet your cycling needs. Our team of
                knowledgeable staff is here to help you find the perfect bike
                and ensure you have the best riding experience possible.
            </p>

            <p className="text-lg">
                Thank you for choosing BikeStore. Let's ride together!
            </p>
        </div>
    )
}

export default About
