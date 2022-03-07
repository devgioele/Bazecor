// -*- mode: js-jsx -*-
/* Bazecor
 * Copyright (C) 2022  Dygmalab, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from "react";
import Styled from "styled-components";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

const Style = Styled.div`

`;

const WhatsNew = () => {
  const [contentRelease, setContentRelease] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [datePublished, setDatePublished] = React.useState(null);
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };

  React.useEffect(() => {
    async function fetchContent(url) {
      try {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setDatePublished(json.published_at);
        setContentRelease(json);
      } catch (error) {
        setError("Error");
      } finally {
        setLoading(false);
      }
    }
    fetchContent(`https://api.github.com/repos/Dygmalab/Bazecor/releases/latest`);
  }, []);

  if (loading) return <div className="loading"></div>;
  if (error) return <p>{error}</p>;
  if (contentRelease === null) return null;
  return (
    <Style>
      <Accordion className="simpleAccordion" defaultActiveKey="0">
        <Card className="simpleAccordionHeader">
          <Accordion.Toggle as={Card.Header} eventKey="1">
            <div className="accordionHeader">
              <div className="accordionTitle">See what&apos;s new in Bazecor</div>
              <span className="plus">icon plus</span>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <h3>What&apos;s new with {contentRelease.name}</h3>
              <h4>{datePublished}</h4>
              <div className="versionContent" dangerouslySetInnerHTML={{ __html: contentRelease.body }} />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Style>
  );
};

export default WhatsNew;
