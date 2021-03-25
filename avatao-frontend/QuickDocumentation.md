## Components

# Show Modal Component:

    -Get's formToRender: string as props from the parent component

    -When createModal() runs, based on the formToRender field renders the correct ReviewForm

# Platform Review Component:
    -First it loads the svg's via FormService, and then creates the buttons from those svgs

    -The textare is binded to the feedback: Feedback object, for the mood buttons I tried multiple other emojis(couldn't get the ones from the UX design)

    -For selecting I had to make my own selector, I tried several libraries but most of them supports dropdownlist instead of this button layout, the other part of them is just not costumizable enough

    -At every submit click the form checks if every field is set in the feedback object, if everything is set and the HTTP call comes with a response(HTTP calls are managed by the ApiClientService) we get a visual feedback of the submission, if error, we get a warning message.


# Task Review Component:
    -First it seeds the buttons and then initializes the two Review object(one for the first part of the form and one for the second part(structureReview: first part, confidenceReview: second part ))

    -The same logic is applied here for selecting from the buttons, and the submit is the same as the Platform Review Component

    -I send every data to the ApiClientService as an Interface


## Services

# ApiClient Service
    - I store the JWT token because the backend right now doesn't support giving me the JWT so I used the first user's JWT token to authorize myself on the backend.

    -I used interfaces to create the request object for the API calls

    -Both of the API calls structured the same, I set the header with the JWT token, then create the body object from the form data and send the request

# FormData Service
    - Initial tought was to read the button and emoji informations from an API endpoint or a JSON file, but then went with this simpler setup
    
    - In this service I implemented the buttons seedings, injecting the emojis to the SvgIcon set

    - RemoveSelection() is used by both of the forms, so I moved it here to be able to access it from anywhere

# Notifier Service
    - Used for showing SnackBar on the bottom of the page, needs for visual feedback of the form's submission

