import styled from "styled-components";
import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";

import {
  setAction,
  setToolsModal,
  setToolsCurrentId,
  getToolCategories,
  getTools,
  selectors as toolsSelector,
} from "@/redux/slices/tools";
import { AdminLayout as Layout } from "@/layout";
import CreateOrEditToolsModal from "@/components/modals/tools/tools/CreateOrEdit";
import DeleteToolsModal from "@/components/modals/tools/tools/Delete";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const Tools = () => {
  const dispatch = useDispatch();

  const { action } = useSelector(toolsSelector.getToolsContent);
  const { items } = useSelector(toolsSelector.getTools);

  const data = items.map((item) => {
    return {
      name: item.name,
      key: item.key,
      fields: item.fields.length,
      category: item.category.name,
      action: item.id,
    };
  });

  const handleCreate = () => {
    dispatch(setAction("create"));
    dispatch(setToolsModal(true));
  };

  const handleDeleleModalOpen = (id) => {
    dispatch(setToolsCurrentId(id));
    dispatch(setAction("delete"));
    dispatch(setToolsModal(true));
  };

  const handleEditModalOpen = (id) => {
    dispatch(setToolsCurrentId(id));
    dispatch(setAction("edit"));
    dispatch(setToolsModal(true));
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Key",
        accessor: "key",
      },
      {
        Header: "Fields",
        accessor: "fields",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ cell }) => (
          <>
            <StyledActionButton
              title="Delete"
              onClick={() => handleDeleleModalOpen(cell.row.values.action)}
            ><i><FaTrashAlt/></i></StyledActionButton>
            <StyledActionButton
              title="Edit"
              onClick={() => handleEditModalOpen(cell.row.values.action)}
            ><i><FaEdit/></i></StyledActionButton>
          </>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  useEffect(() => {
    dispatch(getToolCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTools());
  }, [dispatch]);

  return (
    <Layout>
      <Container className="container-fluid">
        <StyledHeader>
          <StyledButton Color="dodgerblue" onClick={handleCreate}>
            <strong className="fas fa-plus"></strong>
          </StyledButton>
        </StyledHeader>
        <StyledBody>
          <table
            {...getTableProps()}
            className="table table-striped table-bordered"
          >
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, index) => (
                    <th {...column.getHeaderProps()} key={index}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, index) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={index}>
                    {row.cells.map((cell, index) => {
                      return (
                        <td {...cell.getCellProps()} key={index}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </StyledBody>
      </Container>
      {(action === "create" || action === "edit") && <CreateOrEditToolsModal />}
      {action === "delete" && <DeleteToolsModal />}
    </Layout>
  );
};

const StyledButton = styled.button`
  border: 0;
  background-color: ${({ Color }) => Color};
  color: white;
  border-radius: 5px;
  padding: 8px 20px;
  outline: 0;
`;

const StyledActionButton = styled.span`
  margin: 0 5px;
  cursor: pointer;
  color: #5f5f5f;
`;

const Container = styled.div``;

const StyledHeader = styled.div`
  padding-top: 10px;
`;

const StyledBody = styled.div`
  padding: 10px 0;
`;

export default Tools;
