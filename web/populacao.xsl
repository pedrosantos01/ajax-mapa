<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="xml"/>
    <xsl:template match="/">
        <estados>
            <xsl:for-each select="/estados/estado">
                <xsl:sort select="populacao" data-type="number" order="descending"/>
                <rank id="{@id}">
                    <xsl:value-of select="populacao"/>
                </rank>
            </xsl:for-each>            
        </estados>
    </xsl:template>

</xsl:stylesheet>
