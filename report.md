# ASSIGNMENT 1 - PROJECT WITH REPORT
## Sean Pollard Q14543265
## Advanced Database Systems (COM519)
## Solent University
## 21st January 2022

### Link to Hosted Web Application
[]()

### Link to Hosted GIT Repository
[]()
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

