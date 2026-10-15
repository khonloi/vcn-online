import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { escapeXml, wrapCdata } from '../xml';

describe('XML Sanitization & CDATA Utilities', () => {
  describe('escapeXml', () => {
    it('returns empty string for null, undefined, or empty values', () => {
      assert.equal(escapeXml(undefined), '');
      assert.equal(escapeXml(null), '');
      assert.equal(escapeXml(''), '');
    });

    it('escapes &, <, >, \', and " characters correctly', () => {
      const input = '<tag attr="test & value" quote=\'single\'>Content & More</tag>';
      const expected =
        '&lt;tag attr=&quot;test &amp; value&quot; quote=&apos;single&apos;&gt;Content &amp; More&lt;/tag&gt;';
      assert.equal(escapeXml(input), expected);
    });

    it('leaves standard alphanumeric strings untouched', () => {
      assert.equal(escapeXml('Simple headline 123'), 'Simple headline 123');
    });
  });

  describe('wrapCdata', () => {
    it('returns empty CDATA block for null or undefined', () => {
      assert.equal(wrapCdata(undefined), '<![CDATA[]]>');
      assert.equal(wrapCdata(null), '<![CDATA[]]>');
      assert.equal(wrapCdata(''), '<![CDATA[]]>');
    });

    it('wraps content in standard CDATA tags', () => {
      assert.equal(wrapCdata('Breaking News Report'), '<![CDATA[Breaking News Report]]>');
    });

    it('escapes rogue CDATA terminator sequences', () => {
      const hostile = 'Malicious ]]><script>alert(1)</script>';
      assert.equal(wrapCdata(hostile), '<![CDATA[Malicious ]]&gt;<script>alert(1)</script>]]>');
    });
  });
});
