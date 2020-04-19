# MSSE-661-Web-Software-Development-Final-Project

## Abstract -

My final project proposal is for a website that allows my local Dungeons and Dragons group to log in and select a list of current available pre-generated characters organized by class, sub-class, and level. Technologies I would like to include are HTML, CSS, and JavaScript for basic page structure and formatting, AJAX for dynamic form field updates based on previous selections, and a MySQL database to hold information on each available character, as well as a downloadable copy of the PDF character sheet.

## MSSE 661 Final Project Proposal -

This document contains an in-depth proposal of the final project for MSSE 661 Website Software Development at Regis University submitted by Frank C. Jamison

## Problem Statement -

As a Dungeon Master for So-Cal Games and Comics in Temecula, California, require a database of pre-generated characters for clientele to use at store hosted events. There are currently over 100 combinations of characters based on class and sub-class and each character must be built out for each of the possible 20 levels of play. This will allow the store to save paper by only printing what players will need instead of providing printed characters for each variation of character. Each character should be classified by class, subclass, and level, with each selection narrowing the options of the next selector. Once all selection fields are completed, the site should query the database and either serve up a PDF character sheet of provide the link to where that character sheet can be downloaded.

## Design Methods -

Using the Extreme Programming agile design methodology, the proposed website should use a MySQL database to hold login information for store clients and personnel, as well as character data used to serve up the character sheets or character sheet links that the user requests. Ajax should be used to populate select options based on the selected option of a previous field. HTML, CSS, and JavaScript should be used to structure the website content, present that content in a pleasing user interface, and allow for form interactivity to query the database respectively.

### The steps involved in Extreme Programming are as follows (Siddharth, 2016):

Step 1: Planning
• Break the user stories into small part
• gather information related to user stories
• Prepare plan, time and cost to carry out the work.
Step 2: Analysis
• Capture stories in parking lot
• prioritize stories
• define budget
• define iteration span time
Step 3: Design
• Break down of task
• Test scenario preparation for each task.
Step 4: Execution
• Coding
• Testing
• Mid iteration review
• End of iteration review
Step 5: Wrapping
• Small releases
• Demos and reviews
• Develop stories based on customer need
• Process improvement on an end of an iteration.
Step 6: Closure
• Pilot launch to test the product
• Give training
• Production launch
• Production Support

## Testing Methods -

Quality assurance tests should be run to ensure the final website performs as expected. For user logins, testing should include the creation of a user login account, as well as successful login and login failure functionality. The Ajax functionality should be tested to ensure each successive form field is filtered based of the selection of the previous field and that selections. Finally, form submission and database functionality should be tested to ensure that the proper PDF Character Sheet or PDF Character Sheet Link is returned from the database.

## References -

Siddharth. (2016, October 28). How to Implement an Agile Development Process in a Few Easy Steps. Retrieved from Snyxius.com: https://www.snyxius.com/implement-agile-development-process-easy-steps/

## Instructions for review

### Database Installation

This project uses a MySQL Database, and you will need to import my database to review the site functionality.

Use MySQL Workbench to create a new database called ancientwhitearmyvet

From MySQL Workbench, log in to MySQL.

From the menu at the top, go to Server > Data Import

Under Import Options, select the repository folder Database/Dump20200418

From the tabs at the top, click on Import Progress

Click on the Start Import button.

### Starting the Application

In VS Code, right-click on the Application folder and select Open in Terminal

Split the screen

In Window 1 type cd ../web-server and press Enter

In each window, type npm install and press enter

In each window, type npm start and press enter

### Testing the Application

In your browser, navigate to http://localhost:4000

#### Auth test

Register yourself as a new user

Log in using your newly created credentials

#### Physical Stat Generator

Click on the Hamburger Menu and select Physical Stat Generator

Select a race and click on the Calculate Characteristics button

#### Ability Generator

Click on the Hamburger Menu and select Ability Generator

Click on the Calculate Abilities button

#### Pre-Generated Characters

Click on the Hamburger Menu and select Pre-Generated Characters

I have only created characters for Level 9, so you should limit your level selection to 9th Level.

Select a Class and 9th Level

To view a character sheet, click the Download button for your desired character.

#### Logging Our

Click on the Hamburger Menu and select Log Off
