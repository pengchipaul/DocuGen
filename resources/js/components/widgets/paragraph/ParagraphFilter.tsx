import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Form,
  Row,
  Col,
  Container,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import MultiSelect from "react-multi-select-component";

import { ParagraphState, Paragraph } from "../../../store/types/paragraphTypes";
import { TagState } from "../../../store/types/tagTypes";
import { RootState } from "../../../store/reducers/rootReducer";
import {
  SortParagraphsByCreatedDate,
  SortParagraphsByUpdatedDate,
  ParagraphHasTags
} from "../../../helper/ParagraphHelper";

interface ParagraphFilterProps {
  setParagraphs: Function;
  setColNum: Function;
}

function ParagraphFilter(props: ParagraphFilterProps) {
  // get all paragraphs from global state
  const paragraphState: ParagraphState = useSelector(
    (state: RootState) => state.paragraphs
  );

  // get/set filtered paragraphs
  const [filteredParagraphs, setFilteredParagraphs] = useState({
    data: [],
  });

  // update filterd paragraphs displayed in paragraph page
  useEffect(() => {
    props.setParagraphs({ data: filteredParagraphs.data });
  }, [filteredParagraphs]);

  /* update columns  */
  const maxColNum = 4;
  const changeColNum = (num: number) => {
    if (num >= 1 && num <= maxColNum) {
      props.setColNum(num);
    }
  };

  /* filter process */
  const filterByAllConditions = () => {
    // all paragraphs
    var paragraphs = paragraphState.data;

    // sort before filtering by other conditions
    switch (sortCondition) {
      case UPDATEDASEC:
        paragraphs = SortParagraphsByUpdatedDate(paragraphs, 1);
      case UPDATEDDESC:
        paragraphs = SortParagraphsByUpdatedDate(paragraphs, -1);
      case CREATEDASEC:
        paragraphs = SortParagraphsByCreatedDate(paragraphs, 1);
      case CREATEDDESC:
        paragraphs = SortParagraphsByCreatedDate(paragraphs, -1);
      default:
        paragraphs = SortParagraphsByUpdatedDate(paragraphs, -1);
    }

    // filter by content
    if (searchContent != "") {
      paragraphs = paragraphs.filter((p: Paragraph) => {
        return p.content.toUpperCase().includes(searchContent.toUpperCase());
      });
    }

    // filter by note
    if (searchNote != "") {
      paragraphs = paragraphs.filter((p: Paragraph) => {
        return p.note != null && p.note.toUpperCase().includes(searchNote.toUpperCase());
      });
    }

    // filter by tags
    if (selectedTags.length > 0) {
      paragraphs = paragraphs.filter((p: Paragraph) => {
        return ParagraphHasTags(p, selectedTags)
      })
    }

    setFilteredParagraphs({ data: paragraphs });
  };

  /* search */
  const [searchContent, setSearchContent] = useState("");
  const handleSearchContentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchContent(event.currentTarget.value);
  };
  const [searchNote, setSearchNote] = useState("");
  const handleSearchNoteChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchNote(event.currentTarget.value);
  };
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  // get all tags from global tag state
  const tagState: TagState = useSelector((state: RootState) => state.tag)
  useEffect(() => {
    if(tagOptions.length > 0 && selectedTags.length == 0){
      var element = document.getElementsByClassName("dropdown-heading-value")[0]
    element.getElementsByTagName("span")[0].innerHTML = "Select tags"
    }
  }, [tagOptions, selectedTags])
  useEffect(() => {
    var options: any[] = [];
    tagState.data.forEach((t) => {
      options.push({
        label: t.name,
        value: t.id,
      });
    });
    setTagOptions(options);
  }, [tagState]);

  const clearSearch = () => {
    setSearchNote("");
    setSearchNote("");
    setSelectedTags([]);
  };
  /* sorts */
  const UPDATEDASEC = 1;
  const UPDATEDDESC = 2;
  const CREATEDASEC = 3;
  const CREATEDDESC = 4;
  const [sortCondition, setSortCondition] = useState(UPDATEDDESC);
  const sortByUpdatedDateUp = () => {
    var paragraphs = SortParagraphsByUpdatedDate(filteredParagraphs.data, 1);
    setFilteredParagraphs({ data: paragraphs });
    setSortCondition(UPDATEDASEC);
  };
  const sortByUpdatedDateDown = () => {
    var paragraphs = SortParagraphsByUpdatedDate(filteredParagraphs.data, -1);
    setFilteredParagraphs({ data: paragraphs });
    setSortCondition(UPDATEDDESC);
  };
  const sortByCreatedDateUp = () => {
    var paragraphs = SortParagraphsByCreatedDate(filteredParagraphs.data, 1);
    setFilteredParagraphs({ data: paragraphs });
    setSortCondition(CREATEDASEC);
  };
  const sortByCreatedDateDown = () => {
    var paragraphs = SortParagraphsByCreatedDate(filteredParagraphs.data, -1);
    setFilteredParagraphs({ data: paragraphs });
    setSortCondition(CREATEDDESC);
  };

  // refresh filtered result if global paragraph state, search content or search
  // note changes
  useEffect(() => {
    filterByAllConditions();
  }, [paragraphState, searchNote, searchContent, selectedTags]);

  return (
    <Container fluid>
      <Row className="align-items-center">
        <Col xs="3" className="my-1 px-1">
          <Form.Control
            value={searchContent}
            onChange={handleSearchContentChange}
            placeholder="Search content"
          />
        </Col>
        <Col xs="auto" className="my-1 px-1">
          <Form.Control
            value={searchNote}
            onChange={handleSearchNoteChange}
            placeholder="Search note"
          />
        </Col>
        {tagOptions.length > 0 && (
          <Col xs="auto" style={{width: 250}} className="my-1 px-1">
            <MultiSelect
              options={tagOptions}
              value={selectedTags}
              onChange={setSelectedTags}
              labelledBy={"selet-tags"}
              filterOptions={
                (options, filter) => {
                  if(!filter) {
                    return options
                  }
                  return options.filter(
                    ({label}) => label.toUpperCase().includes(filter.toUpperCase())
                  )
                }
              }
            />
          </Col>
        )}
        <Col className="my-1">
          <Button onClick={clearSearch} variant="light">
            <u>Clear</u>
          </Button>
        </Col>
        <Col xs="auto" className="my-1">
          <DropdownButton
            variant="Light"
            alignRight
            title="Sort By"
            id="paragraph-sort-by"
          >
            <Dropdown.Item onClick={sortByUpdatedDateUp}>
              Updated Date &nbsp;&nbsp;
              <FaArrowAltCircleUp />
            </Dropdown.Item>
            <Dropdown.Item onClick={sortByUpdatedDateDown}>
              Updated Date &nbsp;&nbsp;
              <FaArrowAltCircleDown />
            </Dropdown.Item>
            <Dropdown.Item onClick={sortByCreatedDateUp}>
              Created Date &nbsp;&nbsp;
              <FaArrowAltCircleDown />
            </Dropdown.Item>
            <Dropdown.Item onClick={sortByCreatedDateDown}>
              Created Date &nbsp;&nbsp;
              <FaArrowAltCircleDown />
            </Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col xs="auto" className="my-1 pr-1">
          <DropdownButton
            variant="Light"
            alignRight
            title="Columns"
            id="paragraph-columns"
          >
            {Array.from({ length: maxColNum }, (_, index) => index + 1).map(
              (index) => (
                <Dropdown.Item key={index} onClick={() => changeColNum(index)}>
                  {index} {index > 1 ? "Columns" : "Column"}
                </Dropdown.Item>
              )
            )}
          </DropdownButton>
        </Col>
      </Row>
    </Container>
  );
}

export default ParagraphFilter;
