const radioDivs = document.querySelectorAll(".query-type"); //selects elements w this class
const formGroup = document.querySelectorAll(".form-group");
const formElement = document.querySelector("form");
const toast = document.querySelector(".toast");
let formValid = true;


formElement.setAttribute("novalidate", ""); //previous form el chosen - validation is disabled



//this function loops through the elements and changes bg of the selected radio button
const changeRadioBg = () => {
    radioDivs.forEach(radioDiv => {
        const radio = radioDiv.querySelector("input");
        if(radio.checked) {
            radioDiv.classList.add("radio-selected");
        }else {
            radioDiv.classList.remove("radio-selected");
        }
    });

};

//hides error message by looping through error elements and adds the .hidden class to hide the messages
const displayError = (formGroup, error) => {
    const errorMessage = formGroup.querySelectorAll(".error"); {
        errorMessage.forEach(error => {
            error.classList.add("hidden");
        })
    }
};


//removes the hidden classes so the message can be displayed
const removeError = (formGroup) => {
    const errorMessage = formGroup.querySelectorAll(".error");
    errorMessage.forEach(error => {
        error.classList.remove("hidden");
    })

};

//this function validates the form and displays error messages if any field is not filled
const validateGroup = formGroup => {
    const inputType = formGroup.querySelector("input, textarea").type || "text"; //finds an input within the formGroup and retrieves the type. 
    //if there is not input it defaults to 'text'


    //using a switch stmnt to handle diff types of inouts

    switch (inputType) {
        case "radio":
            let checked = false;
            const radioInputs = formGroup.querySelectorAll(".input");
//loops through each radio btn and checks if it is checked(selected)
            radioInputs.forEach(input => {
                if (input.checked) { // checks if current radio inouts is checked
                    checked = true;

                }
            })

            //if nonne is checked, it calls the displayError function to show error msg
            //then sets formValid to false, this basicalls says that the form is not valid
            if (!checked) {
                displayError(formGroup, ".error");
                formValid = false;
            }
            break;


            //hnadling validation for checkboxes
            case "checkbox":
                const checkInput = formGroup.querySelector("input");
//if it is not checked, it calls the displayError function to show error msg
                if (!checkInput.checked) {
                    displayError(formGroup, ".error");
                    formValid = false;
                }
                break;

            
//handling validation for text fields
                case "text":
                    const textInput = formGroup.querySelector("input[type='text']");
                    if(textInput.value.trim() === "") {
                        displayError(formGroup, ".error");
                        formValid = false;
                    }
                    break;

                    case "textarea":
                        const textareaInput = formGroup.querySelector("textarea");
                        if(textareaInput && textareaInput.value.trim() === "") {
                            displayError(formGroup, ".error");
                            formValid = false;
                        }
                        break;

 //handles email inputs validation                       
                        case "email":
                            const emailInput = formGroup.querySelector("input[type='email]");
                            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                            if(emailInput.value.trim() === "") {
                                displayError(formGroup, ".empty");
                                formValid = false;
                            } else if (!emailRegex.test(emailInput.value)) {
                                displayError(formGroup, ".valid");
                                formValid = false;
                              }
                              break;
                            default:
                              break;
                            }
                        };
//shows the temp notif to the user
                        const displayToast = () => {
                            setTimeout(() => {
                                toast.classList.remove("hidden");
                            }, 10);
                            setTimeout(() => {
                                toast.classList.add("hidden");
                            }, 3000);
                        }


    document.addEventListener('DOMContentLoaded', () => {
        if (localStorage.getItem('showToast') === 'true') {
            displayToast();

            localStorage.removeItem('showToast');
        }
    });


//sets an eventlistener for each radio button's container
    radioDivs.forEach(radioDiv => {
        radioDiv.addEventListener("click", () => {
            const radioInput = radioDiv.querySelector("input");
            radioInput.checked = true;
            changeRadioBg();
            removeError(radioDiv.parentElement.parentElement);
        });
    });

    // formElement.addEventListener("submit", event => {
    //     event.preventDefault();

    //     formValid = true;

    //     formGroup.forEach(formGroup => {
    //         validateGroup(formGroup);
    //     });
    //     if (formValid) {
    //         localStorage.setItem('showToast', 'true');
    //         formElement.submit();
    //     }
    // });

    // formGroup.forEach(formGroup => {
    //     const inputs = formGroup.querySelector("input, textarea");
    //     inputs.forEach(input => {
    //       input.addEventListener("click", () => {
    //         removeError(formGroup);
    //       });
      
    //       input.addEventListener("blur", () => {
    //         validateGroup(formGroup);
    //       });
    //     });
    //   });
      
    //   toast.addEventListener("click", () => {
    //     toast.classList.add("hidden");
    //   });

