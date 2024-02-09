Asagao.namespace('Asagao.ConsentBlock');

Asagao.ConsentBlock = {
    init: function ($block) {
        var steps = {
            first: 1,
            second: 2,
            third: 3,
            submit: 4
        };

        var fields = {
            hcptype: "hcptype",
            salutation: "salutation",
            title: "title",
            firstname: "firstname",
            middlename: "middlename",
            lastname: "lastname",
            postalcode: "postalcode",
            personid: "personid",
            specialty: "specialty",
            otherSpecialty: "otherSpecialty",
            email: "email",
            therapeuticAreas: "therapeuticAreas",
            topics: "topics"
        };

        var $result = $block.find(".js-result");
        var $backButton = $block.find(".js-back");
        var $nextButton = $block.find(".js-next");
        var $form = $block.find(".js-form");

        var currentStep = steps.first;

        function getControl(name) {
            return $block.find('[name="' + name + '"]');
        }

        function isShowControl(name) {
            return getControl(name).length;
        }

        function getValue(fieldname) {
            return getControl(fieldname).val();
        }

        function getDropdownText(fieldname) {
            return getControl(fieldname).find("option:selected").text();
        }

        function showHideConfirmationField(isShow, fieldName) {
            var $field = $result.find(".js-" + fieldName);
            isShow() ? $field.show() : $field.hide();
        }

        function clearSpeciality() {
            getControl(fields.specialty).val("");
        }

        function clearOtherSpeciality() {
            getControl(fields.otherSpecialty).val("");
        }

        function isShowSpecialty() {
            return getControl(fields.hcptype).find("option:selected").data("show-specialty") === "True";
        }

        function isShowSalutations() {
            return isShowControl(fields.salutation);
        }

        function isShowTitle() {
            return isShowControl(fields.title);
        }

        function isShowTopics() {
            return isShowControl(fields.topics + "Wrapper");
        }

        function isShowTherapeuticAreas() {
            return isShowControl(fields.therapeuticAreas + "Wrapper");
        }

        function getCheckboxListValues(fieldName) {
            return $block
                .find(".js-" + fieldName + "Wrapper")
                .find("input:checked")
                .map(function () {
                    return this.value;
                })
                .get()
                .join(', ');
        }

        function getCheckboxListDisplayNames(fieldName) {
            return $block
                .find(".js-" + fieldName + "Wrapper")
                .find("input:checked")
                .map(function () {
                    return $(this).data("display-name");
                })
                .get()
                .join(', ');
        }
        
        function getTherapeuticAreasValue() {
            return getCheckboxListValues(fields.therapeuticAreas);
        }
        function getTherapeuticAreasDisplayNames() {
            return getCheckboxListDisplayNames(fields.therapeuticAreas);
        }

        function getTopicsValue() {
            if (isShowTopics()) {
                return getCheckboxListValues(fields.topics);
            }

            return $nextButton.data("default-topic");
        }
        function getTopicsDisplayNames() {
            return getCheckboxListDisplayNames(fields.topics);
        }

        function setConfirmationField($result, fieldname) {
            $result.find(".js-" + fieldname + " span").text(getValue(fieldname));
        }
        function setConfirmationFieldFromDropdown($result, fieldname) {
            $result.find(".js-" + fieldname + " span").text(getDropdownText(fieldname));
        }

        function setTopicsConfirmationField($result) {
            $result.find(".js-topics span").text(getTopicsDisplayNames());
        }

        function setTherapeuticAreasConfirmationField($result) {
            $result.find(".js-therapeuticAreas span").text(getTherapeuticAreasDisplayNames());
        }

        function setActiveStep() {
            $block.find(".js-step").removeClass("active");

            var activeStepSelector = ".js-step-" + currentStep;
            $block.find(activeStepSelector).addClass("active");

            (currentStep === steps.first) ? $backButton.hide() : $backButton.show();

            (currentStep === steps.submit) ? $nextButton.text($nextButton.data("submit")) : $nextButton.text($nextButton.data("next"));
        }

        function fillConfirmationScreen() {
            setConfirmationFieldFromDropdown($result, fields.hcptype);

            showHideConfirmationField(isShowSalutations, fields.salutation);
            setConfirmationFieldFromDropdown($result, fields.salutation);

            showHideConfirmationField(isShowTitle, fields.title);
            setConfirmationField($result, fields.title);

            setConfirmationField($result, fields.firstname);
            setConfirmationField($result, fields.middlename);
            setConfirmationField($result, fields.lastname);
            setConfirmationField($result, fields.personid);
            setConfirmationField($result, fields.postalcode);

            showHideConfirmationField(isShowSpecialty, fields.specialty);
            setConfirmationFieldFromDropdown($result, fields.specialty);

            showHideConfirmationField(isShowOtherSpecialty, fields.otherSpecialty);
            setConfirmationField($result, fields.otherSpecialty);

            setConfirmationField($result, fields.email);

            showHideConfirmationField(isShowTherapeuticAreas, fields.therapeuticAreas);
            setTherapeuticAreasConfirmationField($result);

            showHideConfirmationField(isShowTopics, fields.topics);
            setTopicsConfirmationField($result);
        }

        function showProgressStep() {
            $block.find(".js-form").remove();
            $block.find(".js-step-progress").show();
        }

        function submit() {

            var data = {
                Type: getValue(fields.hcptype),
                Salutation: getValue(fields.salutation),
                Title: getValue(fields.title),
                FirstName: getValue(fields.firstname),
                MiddleName: getValue(fields.middlename),
                LastName: getValue(fields.lastname),
                PostalCode: getValue(fields.postalcode),
                PersonId: getValue(fields.personid),
                Specialty: getValue(fields.specialty),
                Other: getValue(fields.otherSpecialty),
                Email: getValue(fields.email),
                TherapeuticAreas: getTherapeuticAreasValue(),
                Topics: getTopicsValue(),
                Language: $nextButton.data("language"),
                BlockId: $nextButton.data("block-id")
            };
            showProgressStep();

            $.ajax({
                type: 'POST',
                cache: false,
                url: $nextButton.data("url"),
                data: data,
                success: function (data) {
                    $block.find('.js-step-progress').remove();
                    $block.html(data.Result);
                },
                error: function () {
                    alert('submit unexpected error');
                }
            });
        }

        function isShowOtherSpecialty() {
            return getControl(fields.specialty).find("option:selected").data("show-other-specialty") === "True";
        }

        function showHideOtherSpeciality() {
            var $otherSpecialtyWrapper = $form.find(".js-otherSpecialtyWrapper");
            if (isShowOtherSpecialty()) {
                $otherSpecialtyWrapper.show();
            } else {
                clearOtherSpeciality();
                $otherSpecialtyWrapper.hide();
            }
        }

        getControl(fields.specialty).change(function () {
            showHideOtherSpeciality();
        });



        $block.on("click", ".js-back", function () {
            if (currentStep === steps.first) {
                return;
            }

            currentStep -= 1;
            setActiveStep();

        });

        setActiveStep();
    }
};

$(document).ready(function () {
    $(".js-consent-block").each(function (index) {
        Asagao.ConsentBlock.init($(this));
    });
});
