# ASSIGNMENT 1 - PROJECT WITH REPORT
## Sean Pollard Q14543265
## Advanced Database Systems (COM519)
## Solent University
## 21st January 2022

### Link to Hosted Web Application

### Link to Hosted GIT Repository

### Introduction
Genshin Impact is an action role-playing game developed by the Chinese company MiHoYo. The game challenges players to collect and strengthen characters to form powerful, synergised teams so that they may defeat powerful enemies and progress through the story told about 'The Traveller'. An element of upgrading the characters is earning of 'Artifacts' and enhancing them. Each character can equip one of each type of Artifact: 'Flower of Life', 'Plume of Death', 'Sands of Eon', 'Goblet of Eonothem' and 'Circlet of Logos'. Each Artifact is part of a 'Set' and has a 'Rarity', a 'Level', a specialist main attribute ('Main Stat') and a subset of up to 4 additional attributes ('Sub Stats') to boost a character's abilities. Also, equipping multiple Artifacts from the same Set on a single character provides extra bonuses. Pictured below is the character 'Kamisato Ayaka' and a summary of equipped Artifacts, including some attribute bonuses (Max HP, ATK, DEF and Elemental Mastery) along with two bonuses gained by equipping four Artifacts from the 'Shimenawa's Reminiscence' Set.

![Kamisato Ayaka's Artifacts](/report/figure-1.png)
Kamisato Ayaka's Artifacts

Managing Artifacts in game is very time consuming and difficult as the game's comparison system is extremely basic, a player can store up to 1,500 in their inventory and every Artifact's stats are generated randomly. To earn Artifacts of the highest rarity, a player must have progressed a certain amount within the game and then may target a specific Set by completing a challenge which has a chance of earning Artifacts and other rewards from it. The number of times rewards can be collected are primarily limited by the amount of 'Original Resin' available to redeem and 'Original Resin' can only be gained through the passing of real time (1 per 8 minutes, up to a maximum of 160 Original Resin) or by spending premium (paid for by real world money) currency, placing a high value on these Artifacts. This project proposes to provide an intuitive, advanced comparison system for a player's Artifacts so they might make informed choices about which to use on their characters. As a player of this game, I know it's something I'd greatly value!

### System Overview
Following learning how to use MongoDB, express, node.js and the various other tools demonstrated in this module, I took the opportunity to embrace these and build my application based on these concepts. This was quite far out of my comfort zone of using the Microsoft 365 package available to me at work, but I relished the challenge.

#### Datastores
The design of the datastores was the most important thing to consider to ensure that all the variables in play would be addressible in a logical way to be accessed by a simple to use application. After compiling a list of what I knew about Artifacts, I researched to find out more. There are a number of fan made resources, including data mines of the game data, available on the internet which explain the composition of artifacts and how the game assigns attributes to them. The important relationship between the attributes is heirarchical and shown below.

![Artifact Attribute Hierarchy](/report/figure-2.png)
Artifact Attribute Hierarchy

I then went through a normalisation process with the values associated to the attributes so I could decide on my data models. I ended up designing 8 different models, many of them using arrayed sub-documents to take full advantage of this noSQL approach an organise the values in a natural way.

#### System Process
I adopted a standard structure for my files and scripts so that they were easy to work with and deploy. The image below shows a basic communication pathway between the different services implemented.

![System Design](/report/figure-3.png)
System Design

#### Interface
I wanted something easy and quick to use, while being able to implement some validation to ensure no impossible Artifacts are input and stored. I used [Material Design for Bootstrap](https://mdbootstrap.com) for most of the style elements and chose a dark theme as I find it much easier on the eyes. 

![Artifact Evaluator Screenshot](/report/figure-4.png)
Artifact Evaluator Screenshot

The highlights of chosen options makes it clear to the user what they've already interacted with and the display on the left turns thses options into the attributes for their Artifact.

### Key Design Decisions



###Colour Choices
As shown in the wire frames above, a verysimple colour scheme of four colours has been opted for. These are:
- Black (RGB 0,0,0) - used in text against white / off white
- White (RGB 255,255,255) - used in text against charcoal and as the background to the forms sections
- Off White (RGB 245,245,245) - used as the main body background
- Charcoal (RGB 49,49,49) - used as the background to the nav menus and the links to forms

These colours were chosen as they fit in with the over all style of Hampshire County Council's other web pages (see example below). These neutral colours make it very easy to read text.

![Example of Hantsweb desktop site](/img/hantsweb.png)
Example of Hantsweb desktop site

In later development of the pages, a requirement for further colours to aid form validation was noted and the following two colours used:
- Red (RGB 255,0,0) - used to identify form fields which are invalid
- Grey (RGB 128,128,128) - used for borders of form fields which are valid or have not yet been checked

###Accessibility
A lot of care has been taken to ensure that not only the [W3C standards](https://www.w3.org/WAI/standards-guidelines/wcag/) have been conformed to as closely as possible, but the [guidance issued by gov.uk](https://www.gov.uk/service-manual/helping-people-to-use-your-service/understanding-wcag) has also been followed as this solution will sit as part of a local authority website.
- Perceivable - All content is text based to ensure that screen readers are capable of relaying information to the user. Images and other non-text based content would not have added any value to the site so they were omitted.
- Operable - The site is fully navigable by keyboard and the form does not use any kind of time-out mechanism to allow slower users to complete it without issue.
- Understandable - Care has been taken to use as simple language as possible and the only complex language is unavoidable as they are subject relevant technical terms. The only abreviations used are in the code of the site, therefore unaffecting the users.
- Robust - the site has been tested in multiple browsers (Google Chrome, Microsoft Edge and Apple Safari) and the site looks and operates the same in all. The site has also been tailored to work across a range of devices, adjusting to mobile mode at a breakpoint of 600 pixels, and can handle being zoomed in up to 300% for those with visual impediments.

An accessbility statement has been provided on the site to detail users what steps have been taken and to sign post them on how to get in touch if they have any issues, queries or suggestions.

###GDPR
The General Data Protection Regulation is still applicable but less of a concern for a site to be used internally only. To ensure this legislation is adhered to, only necessary information is captured and the data is only stored as long as legally required. As this information is used in conjunction with procurement processes, it typically will be held until 7 years after the expiration of the contract. As any personal information provided is both freely available in the working environment and required as part of the user's contract with the organisation, no opt-in has been created. A privacy statement has been included on the site for user's information and so that they may make enquiries or report to the ICO.

###Distance Selling
The online and distance selling legislation is not applicable to this website as no goods or services are being sold. The form purely enhances a process being used by colleagues within an organisation.

###Evaluation
The original ambition of this project was a big one: to create a fully managed workflow for all request processes within the Strategic Procurement department at Hampshire County Council. Although this is a piece of work that needs to be undertaken at some point, the scope was far too large for this project and so just one aspect was chosen. What made it too large was the amount of time available and the required skill level (which was much higher than required for this project) to achieve it. By focussing on just one area, the appropriate level of skill was able to b demonstrated while also generating a proof of concept for the wider piece of work to be carried out at a later date.

Having already had some HTML experience, customising a MySpace profile a decade ago, picking up the skills needed to create the core structure of the pages was fairly easy. Also, having had years of programming experience in another language (VBA), learning the Javascript side of the project was also not too strenuous. The main difficulty encountered was in using CSS for styling the pages and this is probably where the vast majority of time on this project has been spent. The biggest obstacle was attempting to align the form labels with their inputs to the desired clean style. This was originally attempted with floats, but this made the style volatile at different resolutions and difficult to guarantee the experience would be the same in different browsers. After a lot of attempts, the floats were removed and grid was implemented. It took a little research and experimentation, but a smooth and adjustable style was finally achieved.

Having mentioned the Javascript learning to be “not too strenuous”, debugging has caused a real issue. The script used to execute the validation and submission of data on the form was carefully pieced together and found to be working at all but the last stage of testing. Due to time constraints and inability to find the problem, this is something that has not been remedied. Where the script should be declaring to the console that fields are found invalid, it instead is declaring that they are valid and submitting the data; this is against the logic programmed into the script. Without understanding a more suitable way to debug the script in real time, the solution can’t be easily found. Another issue found was a way to efficiently loop through the form elements to retrieve values. Although the loop implemented satisfies most of them, the radio elements are all being examined, rather than just the selected one. This would present a problem for the users of the data in knowing which option was selected. Further research into how to extract only the correct information from this input type is needed to solve this problem.

Testing was largely carried out using Google Chrome and the Inspect tool built into it. This allowed the analysis of the page’s elements reaction to CSS code and also the resizing of the resolution when testing between desktop and mobile versions. Ultimately, some CSS coding decisions were made reactively based on the outcomes seen in using this tool.

A lot of the design choices were informed by existing corporate style. However, as detailed in the accessibility section, these choices were checked against the certified standards to ensure they were appropriate. The minimalist and imageless design was also to help with the speed of loading the site and to ensure there weren’t any unnecessary distractions or possibilities for flaws in a site that will purely be used to aid workflows within an office.

Using GIT as a version control did not come naturally. For collaboration work, this tool appears to be priceless but seems to be nothing more than a repository for someone working alone. The work on this project is all hosted on a [public repository](https://github.com/SeanyPollard/Assignment) for inspection.

This project did not play to my strengths but provided a valuable experience in a field which can be utilised in the role of a data analyst and solutions designer.

