$(() => {
    handleSubscriptionTriggerFunction();
    handleSpecifyOtherFunction();
    handleRadioGroupFunction();
    handleDisableSubmit();
});

function handleSubscriptionTriggerFunction() {
    // retrieve trigger button
    const $triggerButton = $('[data-epiforms-metadata="ir_subscription_trigger"] [type="submit"]');
    if (!$triggerButton.length) return;

    const $triggerEmail = $('[data-epiforms-metadata="ir_subscription_trigger"] [type="text"]');

    // retrieve form wrapper
    const $modal = $('#ir-subscription-wrapper');
    const $modalContent = $modal.find('.modal-content');
    if (!$modal.length) return;

    // retrieve fom
    const $form = $('[data-epiforms-metadata="ir_subscription"]');
    if (!$form.length) return;

    $modalContent.append($form);

    $triggerButton.click(e => {
        e.preventDefault();
        e.stopImmediatePropagation();

        if ($triggerEmail.val()) {
            $triggerEmail.css('border-color', '');
            $form.find('input[type="email"]').first().val($triggerEmail.val());
            $modal.modal('show');
        } else {
            $triggerEmail.css('border-color', 'rgb(255,0,0)');
        }
    });
}

function handleSpecifyOtherFunction() {
    $('[data-epiforms-metadata="ir_survey"]').each(function () {
        const $surveyForm = $(this);
        const $otherDest = $surveyForm.find('.js-other-dest');

        $surveyForm.find('.FormChoice__List__Item[data-destination-field]').each(function () {
            const $srcOption = $(this);
            const $dest = $otherDest.filter(function () {
                return $(this).attr('data-other-name') === $srcOption.attr('data-destination-field');
            });
            const $srcInput = $srcOption.find('.js-other-source').first();
            const $srcCheckbox = $srcOption.find('.FormChoice__Input').first();

            $srcCheckbox.change(function () {
                if (this.checked) {
                    $srcInput.prop('disabled', false);
                    $dest.val($srcInput.val());
                } else {
                    $srcInput.prop('disabled', true);
                    $dest.val('');
                }
            });

            $srcInput.on('input', function () {
                if ($srcCheckbox.is(':checked')) {
                    $dest.val($srcInput.val());
                }
            });
        });
    });
}

function handleRadioGroupFunction() {
    $('[data-epiforms-metadata="ir_subscription"]').each(function () {
        const $subForm = $(this);
        const $choiceElems = $subForm.find('.FormChoice');
        $choiceElems.find('.js-radio-elements').each(function () {
            const $group = $(this);
            if ($group.attr('data-grp-multi-choice').toLowerCase() === 'true') return;
            const elems = $group.attr('data-radio-elements').split(',');

            let arr = [];

            for (const elem of elems) {
                const $e = $choiceElems.find(`[data-name=${elem}]`);
                if (!$e.length)
                    continue;

                arr.push($e);
            }

            for (const $elem of arr) {
                $elem.change(function () {
                    if ($elem.prop('checked')) {
                        for (const $elem2 of arr) {
                            if ($elem === $elem2)
                                continue;

                            $elem2.prop('checked', false);
                        }
                    }
                });
            }
        });
    });
}

function handleDisableSubmit() {
    if (typeof $$epiforms !== 'undefined') {
        $$epiforms(document).ready(function () {
            epi.EPiServer.Forms.AsyncSubmit = true;
            $$epiforms("#ir-subscription-wrapper .EPiServerForms").on("formsStartSubmitting",
                function () {
                    const $form = $(this);
                    const $submitButton = $form.find('.Form__Element.FormSubmitButton');
                    $submitButton.prop('disabled', true);
                });
        });
    }
}
