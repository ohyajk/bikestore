import { FC, useState } from "react"
import { Button, Label, TextInput, Textarea } from "flowbite-react"
import { toast } from "react-toastify"

const Contact: FC = () => {
    const [honey, setHoney] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        if (honey !== "") {
            toast.error("No Bots Allowed!", {
                style: {
                    background: "#2a2a2a",
                    borderWidth: 1,
                    borderColor: "#FFF",
                    boxShadow: "0px 0px 30px 0px rgba(255,94,0,0.3)",
                },
            })
        }
        console.log({ name, email, message })
        toast.success("Message Sent!", {
            style: {
                background: "#2a2a2a",
                borderWidth: 1,
                borderColor: "#FFF",
                boxShadow: "0px 0px 30px 0px rgba(255,94,0,0.3)",
            },
        })
        setLoading(false)
    }

    return (
        <div className="h-full flex justify-center mb-6">
            <div className="max-w-2xl h-fit w-full mx-4 p-6 bg-white rounded-xl">
                <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 outline-none focus-visible:outline-none"
                >
                    <div>
                        <TextInput
                            onChange={(e) => setHoney(e.target.value)}
                            type="text"
                            placeholder="h-o-n-e-y-p-o-t"
                            required={false}
                            className="hidden"
                        />
                    </div>
                    <div>
                        <Label className="" htmlFor="name" value="Your Name" />
                        <TextInput
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="John Doe"
                            required={true}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label
                            className=""
                            htmlFor="email"
                            value="Your Email"
                        />
                        <TextInput
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="you@example.com"
                            required={true}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label
                            className=""
                            htmlFor="message"
                            value="Your Message"
                        />
                        <Textarea
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write your message here..."
                            required={true}
                            rows={6}
                            className="mt-1"
                        />
                    </div>
                    {loading ? (
                        <div className="flex justify-center">
                            <i className="fa-solid fa-spinner animate-spin fa-2x text-primary " />
                        </div>
                    ) : (
                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/70"
                        >
                            Send Message
                        </Button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Contact
