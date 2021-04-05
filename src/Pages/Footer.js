import React from 'react'
import SimpleReactFooter from "simple-react-footer";


function Footer() {
    const description = "K.I.M.Y is a digital E-Learning plateform created to help learners from different backgrounds improve their communication among each other in a safe and easy environment";
  const title = "K.M.I.Y";
  const columns = [
    {
        title: "Resources",
        resources: [
            {
                name: "About",
                link: "/about"
            },
            {
                name: "Careers",
                link: "/careers"
            },
            {
                name: "Contact",
                link: "/contact"
            },
            {
                name: "Admin",
                link: "/admin"
            }
        ]
    },
    {
        title: "Legal",
        resources: [
            {
                name: "Privacy",
                link: "/privacy"
            },
            {
                name: "Terms",
                link: "/terms"
            }
        ]
    },
    {
        title: "Visit",
        resources: [
            {
                name: "Locations",
                link: "/locations"
            },
            {
                name: "Culture",
                link: "/culture"
            }
        ]
    }
 ];
    return (
        <SimpleReactFooter 
        description={description} 
        title={title}
        columns={columns}
        linkedin="fluffy_cat_on_linkedin"
        facebook="fluffy_cat_on_fb"
        twitter="fluffy_cat_on_twitter"
        instagram="fluffy_cat_live"
        youtube="UCFt6TSF464J8K82xeA?"
        pinterest="fluffy_cats_collections"
        copyright="white"
        iconColor="white"
        backgroundColor="#0056d2"
        fontColor="white"
        copyrightColor="darkgrey"
     />
    )
}

export default Footer
