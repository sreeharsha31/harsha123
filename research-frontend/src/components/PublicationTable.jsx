function PublicationTable({ data }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PublicationTable;