import React from "react";
import { FormControl, FormLabel, FormSelect, FormCheck } from "react-bootstrap";

export default function BootstrapForms() {
  return (
    <div id="wd-css-styling-forms">
      <h2>Forms</h2>
      <FormLabel>Email address</FormLabel>
      <FormControl type="email" placeholder="name@example.com" />
      <FormLabel>Example text area</FormLabel>
      <FormControl as="textarea" rows={3} />
      <div>
        <h3>Dropdowns</h3>
        <FormSelect>
          <option value="0" defaultChecked>
            Open this select menu
          </option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </FormSelect>
      </div>
      <div id="wd-css-styling-switches">
        <h3>Switches</h3>
        <FormCheck
          type="switch"
          defaultChecked={false}
          label="Unchecked switch checkbox input"
        />
        <FormCheck
          type="switch"
          defaultChecked={true}
          label="Checked switch checkbox input"
        />
        <FormCheck
          type="switch"
          defaultChecked={false}
          disabled
          label="Unchecked disabled switch checkbox input"
        />
        <FormCheck
          type="switch"
          defaultChecked={true}
          disabled
          label="Checked disabled switch checkbox input"
        />
      </div>
    </div>
  );
}
