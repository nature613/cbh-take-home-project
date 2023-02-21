# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Ticket 1: Spike - As a developer, identify and analyse existing table used to generate facility agent report Description: Identify the tables used for generating report for facility-agent. verify if a new column can be added to the table to accomodate custom_agent_id. Known fact: agent_id is a one-one mapping with custom_agent_id

Ticket 2: Create new column custom_agent_id in the existing table used for report generation Description: Create DDL query to create a new column in the extisting table and add the following index to the table as it would be queried to generate report. Known fact: Indexing would've already been created for facility-agent. index: facility_id_custom_agent_id_idx(facility_id, custom_agent_id)

Ticket 3: As a facility manager, I want to create list of agents under my facility. Description: A excel file with agent information, custom_agent_id will be uploaded to the application for enrollment of the agents into the system. AC: Create a POST end point, /facility/:FacilityId/enrollment/upload that accepts a excel file <5MB and validates the file content and enrolls the listed agents into our system

Ticket 4: As a facility manager, I want a single agent to be created under my facility. Description: A rest endpoint to create a single agent in the facility. AC: Create a POST end point, /facility/:facilityId/agent to accept a JSON payload with agent information such as custom_agent_id along with other details of the agent

Ticket 5: As a facility manager, I want to retrieve my agent information based on the custom_agent_id Description: A rest point to retrieve agent information based on the provided custom_agent_id

Ticker 6: As a facility manager, I want to retrieve all the agents under my facility Description: A rest endpoint to retrieve all the agent information including the custom_agent_id for the provided facility_id AC: Create a GET request, /facility/:faclityId/agents, to return a JSON response of all the agents under the facility

Ticket 7: Ticker 6: As a facility manager, I want to update an agent information Description: A rest endpoint toupdate the agent information including the custom_agent_id for the provided agent_id AC: Create a PUT request, /facility/:faclityId/agent/:agentId, to update agent information

Ticker 8: As a facility manager, I want to remove an agents under my facility Description: A rest endpoint to remove an agent from my facility facility_id AC: Create a DELETE request, /facility/:faclityId/agent/:agentId, to delete a agent from the DB for the specific facility

For the above REST CRUD tickets, unit testing, documentation using OpenAPI specs are a must. Other possible tickets - Load testing, integration testing with front end