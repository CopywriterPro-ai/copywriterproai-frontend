import styled from "styled-components";
import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";

import {
  setAction,
  setCategoriesModal,
  setCategoriesCurrentId,
  getToolCategories,
  selectors as toolsSelector,
} from "@/redux/slices/tools";
import { AdminLayout as Layout } from "@/layout";
import CreateOrEditCategoriesModal from "@/components/modals/tools/categories/CreateOrEdit";
import DeleteCategoriesModal from "@/components/modals/tools/categories/Delete";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const Categories = () => {
  const dispatch = useDispatch();

  const { action } = useSelector(toolsSelector.getToolsContent);
  const { items } = useSelector(toolsSelector.getToolCategories);

  const data = items.map((item) => {
    return {
      name: item.name,
      key: item.key,
      icon: item.icon?.src,
      action: item.id,
    };
  });

  const handleCreate = () => {
    dispatch(setAction("create"));
    dispatch(setCategoriesModal(true));
  };

  const handleDeleleModalOpen = (id) => {
    dispatch(setCategoriesCurrentId(id));
    dispatch(setAction("delete"));
    dispatch(setCategoriesModal(true));
  };

  const handleEditModalOpen = (id) => {
    dispatch(setCategoriesCurrentId(id));
    dispatch(setAction("edit"));
    dispatch(setCategoriesModal(true));
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
        Header: "Icon",
        accessor: "icon",
        Cell: ({ cell }) => <CellImg src={cell.row.values.icon} alt="Icon" />,
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
      {(action === "create" || action === "edit") && (
        <CreateOrEditCategoriesModal />
      )}
      {action === "delete" && <DeleteCategoriesModal />}
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

const CellImg = styled.img`
  width: 25px;
`;

export default Categories;
