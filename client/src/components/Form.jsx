import React from "react";
import { Formik, ErrorMessage } from "formik";
import { Form, Message } from "semantic-ui-react";
import * as yup from "yup";

const validationSchema = yup.object({
  urlData: yup
    .string()
    .url()
    .min(15, "Seems like this url is already quite short")
    .required("You gotta type some url in"),
});
const MyErrorMessage = ({ mess }) => {
  return (
    <Message attached="bottom" compact color="red">
      <p>{mess}</p>
    </Message>
  );
};

const UrlForm = ({ apiCall }) => {
  return (
    <div>
      <Formik
        initialValues={{ urlData: "" }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          apiCall(data);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group inline="true">
              <Form.Input
                name="urlData"
                placeholder="Type in url you want to be shortened"
                value={values.urlData}
                onChange={handleChange}
                width={6}
              />
              <Form.Button
                disabled={isSubmitting}
                type="submit"
                content="Submit"
              />
            </Form.Group>
            <ErrorMessage name="urlData">
              {(msg) => <MyErrorMessage mess={msg} />}
            </ErrorMessage>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export { UrlForm };
