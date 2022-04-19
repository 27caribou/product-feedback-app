import { getRequest, getRequests, postRequest, updateRequest } from "./Server";
import { useEffect } from "react";
import Icon from "./pages/components/Icon";
import CustomSelect from "./pages/components/CustomSelect";

const Test = () => {

    useEffect(() => {

        // getRequests().then(data => {
        //     console.log(data)
        // })

        // getRequest(13).then(data => {
        //     console.log(data)
        // })

        // let test = { title: "Test", category: "bug", upvotes: 12, status: "live", description: "This is a test" }
        // postRequest(test).then(data => {
        //     console.log(data)
        // })

        // let test2 = { description: "I changed the description", title: "Another title" }
        // updateRequest(13, test2).then(data => {
        //     console.log(data)
        // })
    })

    return (
        <div style={{ margin: "60px 100px" }}>
            <div>
                <span>This is a span</span>
                <div>This is a div</div>
                <br/>
                <p>Paragraph: Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad alias animi delectus dolorum ea facere fugit ipsa ipsam nostrum numquam obcaecati pariatur quisquam quod rem reprehenderit, repudiandae, sed velit!</p>
                <br/>
                <h4>H4: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea eos explicabo impedit minima natus nesciunt, nostrum pariatur porro praesentium quas recusandae rem sed unde voluptas voluptatibus. Distinctio doloremque eum rerum?</h4>
                <br/>
                <h3>H3: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam commodi dignissimos dolor dolorem, eveniet exercitationem libero minima molestias neque nisi non obcaecati officia omnis quia sunt totam, vero voluptas, voluptatem.</h3>
                <br/>
                <h2>H2: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi cum cumque debitis deleniti doloribus id impedit ipsa ipsum itaque officiis, omnis perferendis placeat provident quaerat ratione repellendus reprehenderit sit soluta.</h2>
                <br/>
                <h1>H1: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam atque, culpa deleniti deserunt dignissimos distinctio ducimus, ea eaque error eum fugit magni maiores nobis placeat rem similique sint voluptatum.</h1>
                <br/>
                <div>
                    <a href="#">This is a link</a>
                </div>
            </div>
            <br/>
            <div style={{ display: "flex", justifyContent: "space-between", width: "80%" }}>
                <button className="custom-btn purple">Button 1</button>
                <button className="custom-btn blue">Button 2</button>
                <button className="custom-btn dark">Button 3</button>
                <button className="custom-btn red">Button 4</button>
                <button className="custom-btn return"><span>Button 5</span></button>
                <button className="custom-btn return outline">Button 6</button>
            </div>
            <br/>
            <div style={{ backgroundColor: "white", padding: "20px" }}>
                <h4>Elems</h4>
                <br/>
                <div style={{ display: "flex", justifyContent: "space-between", width: "20%" }}>
                    <div className="elem">Enhancement</div>
                    <div className="elem active">All</div>
                </div>
                <br/>
                <div style={{ display: "flex", justifyContent: "space-between", width: "20%" }}>
                    <div className="elem">
                        <div className="votes">
                            <Icon name="arrow-up"/><span>110</span>
                        </div>
                    </div>
                    <div className="elem">
                        <div className="votes">
                            <Icon name="arrow-up"/><span>53</span>
                        </div>
                    </div>
                    <div className="elem">
                        <div className="votes">
                            <Icon name="arrow-up"/><span>7</span>
                        </div>
                    </div>
                    <div className="elem active">
                        <div className="votes">
                            <Icon name="arrow-up"/><span>15</span>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <div style={{ backgroundColor: "white", padding: "20px" }}>
                <h4>Form elements</h4>
                <br/>
                <div style={{ display: "flex", justifyContent: "space-between", width: "45%" }}>
                    <CustomSelect
                        value={ "Most Comments" }
                        options={[ "Most Upvotes", "Least Upvotes", "Most Comments", "Least Comments" ]}
                    />
                    <CustomSelect options={[ "Feature", "UI", "UX", "Enhancement", "Bug" ]}/>
                </div>
                <br/>
                <div style={{ display: "flex", justifyContent: "space-between", width: "65%" }}>
                    <input type="text" placeholder="Type in"/>
                    <input type="text" className="error" placeholder="Error"/>
                    <textarea placeholder="loplo"></textarea>
                </div>
            </div>
            <br/>
            <div style={{ display: "flex", justifyContent: "space-between", width: "10%" }}>
                <div className="comment-number">
                    <div>
                        <Icon name="comments"/>
                        <span>4</span>
                    </div>
                </div>
                <div className="comment-number empty">
                    <div>
                        <Icon name="comments"/>
                        <span>8</span>
                    </div>
                </div>
            </div>
            <br/>
            <div className="card feedback" style={{ width: "67%"}}>
                <div className="col">
                    <div className="elem">
                        <div className="votes">
                            <Icon name="arrow-up"/><span>110</span>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="feedback-body">
                        <h3>Q&A within the challenge hubs</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda corporis culpa eaque ipsum temporibus velit. Autem eligendi facilis maiores quos repellendus. Adipisci aspernatur eveniet, facere itaque molestias tempora voluptatum!</p>
                        <div className="elem">Enhancement</div>
                    </div>
                </div>
                <div className="col">
                    <div className="comment-number empty">
                        <div>
                            <Icon name="comments"/>
                            <span>8</span>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <div style={{ backgroundColor: "white", padding: "20px", margin: "0 145px" }}>
                <div className="feedback-comment">
                    <div className="header">
                        <div className="profile-pic">
                            <img src={ require("./images/user-images/" + "image-james.jpg") } />
                        </div>
                        <div className="names">
                            <h4>James Skinner</h4>
                            <p>@hummingbird1</p>
                        </div>
                        <div className="reply">
                            <a href="#">Reply</a>
                        </div>
                    </div>
                    <div className="body">
                        <div className="description">
                            <p>Second this! I do a lot of late night coding and reading. Adding a dark theme can be great for preventing eye strain and the headaches that result. It’s also quite a trend with modern apps and  apparently saves battery life.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Test