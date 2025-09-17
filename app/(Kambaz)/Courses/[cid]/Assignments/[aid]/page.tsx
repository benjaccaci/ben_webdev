export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ height: 16 }} />
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group" defaultValue="Assignments">
                <option value="Assignments">Assignments</option>
                <option value="Quizzes">Quizzes</option>
                <option value="Exams">Exams</option>
                <option value="Projects">Projects</option>
              </select>
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ height: 16 }} />
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade As</label>
            </td>
            <td>
              <select id="wd-display-grade-as" defaultValue="Percentage">
                <option value="Percentage">Percentage</option>
                <option value="Letter">Letter</option>
              </select>
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ height: 16 }} />
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type" defaultValue="Online">
                <option value="Online">Online</option>
                <option value="Physical">Physical</option>
              </select>
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ height: 16 }} />
          </tr>
          <tr>
            <td align="right" valign="top">
              <label>Online Entry Options:</label>
            </td>
            <td>
              <input
                type="checkbox"
                name="checkbox-text-entry"
                id="wd-text-entry"
              />
              <label htmlFor="wd-text-entry">Text Entry</label>
              <br />
              <input
                type="checkbox"
                name="checkbox-website-url"
                id="wd-website-url"
              />
              <label htmlFor="wd-website-url">Website URL</label>
              <br />
              <input
                type="checkbox"
                name="checkbox-media-recordings"
                id="wd-media-recordings"
              />
              <label htmlFor="wd-media-recordings">Media Recordings</label>
              <br />
              <input
                type="checkbox"
                name="checkbox-student-annotation"
                id="wd-student-annotation"
              />
              <label htmlFor="wd-student-annotation">Student Annotation</label>
              <br />
              <input
                type="checkbox"
                name="checkbox-file-upload"
                id="wd-file-upload"
              />
              <label htmlFor="wd-file-upload">File Uploads</label>
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ height: 16 }} />
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign To</label>
            </td>
            <td>
              <input id="wd-assign-to" defaultValue={"Everyone"} />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-due-date">Due:</label>
            </td>
            <td>
              <input type="date" defaultValue="2000-01-21" id="wd-due-date" />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-from">Available From:</label>
            </td>
            <td>
              <input
                type="date"
                defaultValue="2000-01-14"
                id="wd-available-from"
              />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-until">Available Until:</label>
            </td>
            <td>
              <input
                type="date"
                defaultValue="2000-01-28"
                id="wd-available-until"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
