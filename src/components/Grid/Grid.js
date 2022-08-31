import "./Grid.css";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { useState } from "react";

function Grid({
  data: { header = [], values = [], actions = [], customColumns = [] },
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openedId, setOpenedId] = useState("");

  const toggle = (index) => {
    setOpenedId(index);
    setDropdownOpen((prevState) => !prevState);
  };
  return (
    <table className="gridTable">
      <thead>
        <tr>
          {header.map((colName) => (
            <th key={colName.label}>
              {colName.label}:{colName.type}
            </th>
          ))}
          {customColumns.map((colName) => (
            <th key={colName.label}>
              {colName.label}:{colName.type}
            </th>
          ))}
          {!!actions.length && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {values.map((row, index) => (
          <tr key={index}>
            {header.map((colName) => (
              <td
                className={
                  !isNaN(row[colName.label]) ? "right-aligned-text" : ""
                }
                key={colName.label}
              >
                {row[colName.label]}
              </td>
            ))}
            {customColumns.map((colName) => (
              <td
                className={
                  !isNaN(row[colName.label].length) ? "right-aligned-text" : ""
                }
                key={colName.label}
              >
                {row[colName.label].length}
              </td>
            ))}

            {!!actions.length && (
              <td className="gridActions">
                <Dropdown
                  isOpen={dropdownOpen && openedId === index}
                  toggle={() => toggle(index)}
                >
                  <DropdownToggle caret></DropdownToggle>

                  <DropdownMenu>
                    {actions.map(({ label, action, hideIfEmpty = "" }) =>
                      hideIfEmpty && row[hideIfEmpty].length === 0 ? null : (
                        <DropdownItem key={label} onClick={() => action(row)}>
                          {label}
                        </DropdownItem>
                      )
                    )}
                  </DropdownMenu>
                </Dropdown>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Grid;

Grid.propTypes = {
  header: PropTypes.array,
  values: PropTypes.array,
  actions: PropTypes.array,
  customColumns: PropTypes.array,
};
