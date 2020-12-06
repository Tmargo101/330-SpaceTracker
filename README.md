# 330-SpaceTracker
A Webapp which accesses the (unofficial) SpaceX API.  Created to satisfy requirements for IGME-330 Project 3.


Left panel: database
    - Mission listing
    - More Information about a specific mission
    - Table can be searched by:
        - Booster
        - Mission name
    - Search state is saved to localStorage
    - Controls:
        - Refine by # of times reflown
        - Refine by launch location (SLC-40, Vandenburg, LC-39A)
        - Refine by payload (Crew, ISS Cargo, Sats, Starlink)
Right panel: Map / Video
    - By default: SpaceX Logo
    - When I click on a rocket type (falcon 9):
        - Plot all launch locations
        - Plot all landing locations
        - When you click on a POI, view the launch data (Launch time, Burn duration, etc)
    - When I click on a mission:
        - Show just the POIs for that mission
        - draw a line between launch / landing & show distance between them?
        - Show photos from the mission or the official spaceX video (video in popup?)
- Dark theme?