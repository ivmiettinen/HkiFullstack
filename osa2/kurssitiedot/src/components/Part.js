import React from 'react';

const Part = ({ exercises, name }) => {
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td width='160px'>
              {name}: {''}
            </td>
            <td width='160px'>{exercises}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Part;
