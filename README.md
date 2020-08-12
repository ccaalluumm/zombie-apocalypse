# Zombie Apocalypse App
This project allows a user to specify an illness they are afflicted by, and also a level of pain they are experiencing.

Given the user's input, a list of available hospitals will be provided, along with their respective wait times for receiving treatment, ordered from lowest to highest.

The project is implemented in Next.js, a framework built around React.js, and uses an API for pulling data on illnesses and available hospitals.

# Motivation
During the apocalypse, hospitals are overwhelmed; this app will ease the load on hospitals by allowing people seeking medical attention to choose
the hospitals with lower waiting periods, i.g. hospitals with less load. The end result is that the patient load will be more balanced.

# API Reference
The illness and hospital data can be pulled from the following apis:

- Illnesses: "http://dmmw-api.australiaeast.cloudapp.azure.com:8080/illnesses"
- Hospitals: "http://dmmw-api.australiaeast.cloudapp.azure.com:8080/hospitals"