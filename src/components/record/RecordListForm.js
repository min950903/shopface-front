import React from 'react';

const RecordTableBody = ({ record }) => {
  return (
    <>
      <tr role="row">
        <td>{record.no}</td>
        <td>{record.businessmanId}</td>
        <td>{record.branchNo}</td>
        <td>{record.branchName}</td>
        <td>{record.branchPhone}</td>
        <td>{record.memberId}</td>
        <td>{record.memberName}</td>
        <td>{record.memberPhone}</td>
        <td>{record.workingStartTime}</td>
        <td>{record.workingEndTime}</td>
        <td>{record.workingTime}</td>
        <td>{record.quittingTime}</td>
        <td>{record.occupationName}</td>
        <td>{record.salayPlan}</td>
        <td>{record.salayPay}</td>
        <td>{record.evaluation}</td>
        <td>{record.note}</td>
      </tr>
    </>
  );
};

const RecordListForm = ({ records, recordError, loading }) => {
  return (
    <div className="container-fluid p-0">
      <h1>근무 기록</h1>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="card-body">
                <div
                  id="datatables-buttons_wrapper"
                  className="dataTables_wrapper dt-bootstrap4 no-footer"
                >
                  <div className="row">
                    <div className="col-sm-12 col-md-8"></div>
                    <div className="col-sm-12 col-md-4">
                      <div className="row">
                        <div className="form-inline col">
                          <div className="form-inline col-12"></div>
                          <select
                            id="condition"
                            name="condition"
                            className="form-control"
                          >
                            <option value="branch">사업장 명</option>
                            <option value="businessman">사업자 명</option>
                          </select>
                          <input
                            type="text"
                            id="searchQuery"
                            name="searchQuery"
                            className="form-control form-control-sm mr-1 ml-1"
                            placeholder=""
                            aria-controls="datatables-buttons"
                          />
                          <input
                            type="button"
                            className="btn btn-primary mr-1 ml-1"
                            id="searchButton"
                            name="searchButton"
                            value="검색"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <table
                        id="datatables-buttons"
                        className="table table-striped dataTable no-footer dtr-inline"
                        role="grid"
                        aria-describedby="datatables-buttons_info"
                      >
                        <thead id="table_head"></thead>
                        <tbody id="table_body">
                          {records !== null ? (
                            records.map((record, index) => (
                              <RecordTableBody
                                key={index}
                                record={record}
                              ></RecordTableBody>
                            ))
                          ) : (
                            <>
                              <tr role="row">
                                <td colSpan="4">등록된 기록이 없습니다.</td>
                              </tr>
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecordListForm;
